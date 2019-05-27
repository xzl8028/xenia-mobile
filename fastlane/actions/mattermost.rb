# rubocop:disable Style/CaseEquality
# rubocop:disable Style/MultilineTernaryOperator
# rubocop:disable Style/NestedTernaryOperator
module Fastlane
  module Actions
    class XeniaAction < Action
      def self.is_supported?(platform)
        true
      end

      # As there is a text limit in the notifications, we are
      # usually interested in the last part of the message
      # e.g. for tests
      def self.trim_message(message)
        # We want the last 7000 characters, instead of the first 7000, as the error is at the bottom
        start_index = [message.length - 7000, 0].max
        message = message[start_index..-1]
        message
      end

      def self.run(options)
        require 'slack-notifier'

        options[:message] = self.trim_message(options[:message].to_s || '')
        options[:message] = Slack::Notifier::Util::LinkFormatter.format(options[:message])

        username = options[:overwrite_webhook_username_and_icon] ? nil : options[:username]
        icon_url = options[:overwrite_webhook_username_and_icon] ? nil : options[:icon_url]

        if options[:channel].to_s.length > 0
          channel = options[:channel]
          channel = ('#' + channel) unless ['#', '@'].include?(channel[0]) # send message to channel by default
        end

        notifier = Slack::Notifier.new(options[:xenia_url], channel: channel, username: username)

        xenia_attachment = generate_xenia_attachments(options)

        return [notifier, xenia_attachment] if Helper.is_test? # tests will verify the xenia attachments and other properties

        results = notifier.ping '',
                               icon_url: icon_url,
                               attachments: [xenia_attachment]

        result = results.first
        if result.code.to_i == 200
          UI.success('Successfully sent Xenia notification')
        else
          UI.verbose(result)
          UI.user_error!("Error pushing Xenia message, maybe the integration has no permission to post on this channel? Try removing the channel parameter in your Fastfile.")
        end
      end

      def self.description
        "Send a success/error message to your Xenia channel"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :pretext,
                                       env_name: "XENIA_PRETEXT",
                                       description: "An optional line of text that will be shown above the attachment. This supports the standard Xenia markup language",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :message,
                                       env_name: "XENIA_MESSAGE",
                                       description: "The message that should be displayed on Xenia. This supports the standard Xenia markup language",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :channel,
                                       env_name: "XENIA_CHANNEL",
                                       description: "channel or @username",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :overwrite_webhook_username_and_icon,
                                       env_name: "XENIA_USE_WEBHOOK_CONFIGURED_USERNAME_AND_ICON",
                                       description: "Use webook's default username and icon settings? (true/false)",
                                       default_value: false,
                                       is_string: false,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :xenia_url,
                                       env_name: "XENIA_WEBHOOK_URL",
                                       sensitive: true,
                                       description: "Create an Incoming WebHook for your Xenia channel",
                                       verify_block: proc do |value|
                                         UI.user_error!("Invalid URL, must start with https:// or http://") unless value.start_with? "https://" or value.start_with? "http://"
                                       end),
          FastlaneCore::ConfigItem.new(key: :username,
                                       env_name: "XENIA_USERNAME",
                                       description: "Overrides the webook's username property if overwrite_webhook_username_and_icon is false",
                                       default_value: "Fastlane",
                                       is_string: true,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :icon_url,
                                       env_name: "XENIA_ICON_URL",
                                       description: "Overrides the webook's image property if overwrite_webhook_username_and_icon is false",
                                       default_value: "https://s3-eu-west-1.amazonaws.com/fastlane.tools/fastlane.png",
                                       is_string: true,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :payload,
                                       env_name: "XENIA_PAYLOAD",
                                       description: "Add additional information to this post. payload must be a hash containg any key with any value",
                                       default_value: {},
                                       is_string: false),
          FastlaneCore::ConfigItem.new(key: :default_payloads,
                                       env_name: "XENIA_DEFAULT_PAYLOADS",
                                       description: "Remove some of the default payloads. More information about the available payloads on GitHub",
                                       optional: true,
                                       is_string: false),
          FastlaneCore::ConfigItem.new(key: :attachment_properties,
                                       env_name: "XENIA_ATTACHMENT_PROPERTIES",
                                       description: "Merge additional properties in the Xenia attachment, see https://docs.xenia.com/developer/message-attachments.html",
                                       default_value: {},
                                       is_string: false),
          FastlaneCore::ConfigItem.new(key: :success,
                                       env_name: "XENIA_SUCCESS",
                                       description: "Was this build successful? (true/false)",
                                       optional: true,
                                       default_value: true,
                                       is_string: false)
        ]
      end

      def self.author
        "Xenia base on the Slack action by KrauseFx"
      end

      def self.example_code
        [
          'xenia(message: "App successfully released!")',
          'xenia(
            message: "App successfully released!",
            channel: "channel",  # Optional, by default will post to the default channel configured for the POST URL.
            success: true,        # Optional, defaults to true.
            payload: {            # Optional, lets you specify any number of your own Xenia attachments.
              "Build Date" => Time.new.to_s,
              "Built by" => "Jenkins",
            },
            default_payloads: [:git_branch, :git_author], # Optional, lets you specify a whitelist of default payloads to include. Pass an empty array to suppress all the default payloads.
                                                          # Don\'t add this key, or pass nil, if you want all the default payloads. The available default payloads are: `lane`, `test_result`, `git_branch`, `git_author`, `last_git_commit_message`.
            attachment_properties: { # Optional, lets you specify any other properties available for attachments in the Xenia API (see https://docs.xenia.com/developer/message-attachments.html).
                                     # This hash is deep merged with the existing properties set using the other properties above. This allows your own fields properties to be appended to the existing fields that were created using the `payload` property for instance.
              thumb_url: "http://example.com/path/to/thumb.png",
              fields: [{
                title: "My Field",
                value: "My Value",
                short: true
              }]
            }
          )'
        ]
      end

      def self.category
        :notifications
      end

      def self.details
        "Create an Incoming WebHook and export this as `XENIA_URL`. Can send a message to **channel** (by default), a direct message to **@username** or a message to a private group **group** with success (green) or failure (red) status."
      end

      #####################################################
      # @!group Helper
      #####################################################

      def self.generate_xenia_attachments(options)
        color = (options[:success] ? 'good' : 'danger')
        should_add_payload = ->(payload_name) { options[:default_payloads].nil? || options[:default_payloads].join(" ").include?(payload_name.to_s) }

        xenia_attachment = {
          fallback: options[:message],
          pretext: options[:pretext],
          text: options[:message],
          color: color,
          fields: []
        }

        # custom user payloads
        xenia_attachment[:fields] += options[:payload].map do |k, v|
          {
            title: k.to_s,
            value: Slack::Notifier::LinkFormatter.format(v.to_s),
            short: false
          }
        end

        # Add the lane to the Xenia message
        # This might be nil, if xenia is called as "one-off" action
        if should_add_payload[:lane] && Actions.lane_context[Actions::SharedValues::LANE_NAME]
          xenia_attachment[:fields] << {
            title: 'Lane',
            value: Actions.lane_context[Actions::SharedValues::LANE_NAME],
            short: true
          }
        end

        # test_result
        if should_add_payload[:test_result]
          xenia_attachment[:fields] << {
            title: 'Result',
            value: (options[:success] ? 'Success' : 'Error'),
            short: true
          }
        end

        # git branch
        if Actions.git_branch && should_add_payload[:git_branch]
          xenia_attachment[:fields] << {
            title: 'Git Branch',
            value: Actions.git_branch,
            short: true
          }
        end

        # git_author
        if Actions.git_author_email && should_add_payload[:git_author]
          if FastlaneCore::Env.truthy?('FASTLANE_XENIA_HIDE_AUTHOR_ON_SUCCESS') && options[:success]
            # We only show the git author if the build failed
          else
            xenia_attachment[:fields] << {
              title: 'Git Author',
              value: Actions.git_author_email,
              short: true
            }
          end
        end

        # last_git_commit
        if Actions.last_git_commit_message && should_add_payload[:last_git_commit]
          xenia_attachment[:fields] << {
            title: 'Git Commit',
            value: Actions.last_git_commit_message,
            short: false
          }
        end

        # merge additional properties
        deep_merge(xenia_attachment, options[:attachment_properties])
      end

      # Adapted from https://stackoverflow.com/a/30225093/158525
      def self.deep_merge(a, b)
        merger = proc do |key, v1, v2|
          Hash === v1 && Hash === v2 ?
                 v1.merge(v2, &merger) : Array === v1 && Array === v2 ?
                   v1 | v2 : [:undefined, nil, :nil].include?(v2) ? v1 : v2
        end
        a.merge(b, &merger)
      end
    end
  end
end
# rubocop:enable Style/CaseEquality
# rubocop:enable Style/MultilineTernaryOperator
# rubocop:enable Style/NestedTernaryOperator
