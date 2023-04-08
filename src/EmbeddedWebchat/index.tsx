import { useEffect, useState } from "react";

const INJECTION_ID = "bp-webchat-injection";
const WEBCHAT_ID = "botpress-webchat";
const WRAPPER_ID = `${WEBCHAT_ID}-wrapper`;

declare global {
  interface Webchat {
    init: (options: any, id?: string) => void;
    sendEvent: (event: any, id?: string) => void;
    onEvent: (
      callback: (event: WebchatEvent) => void,
      topics: WebchatEventType[],
      id?: string
    ) => void;
  }

  type WebchatEventType =
    | "LIFECYCLE.LOADED"
    | "LIFECYCLE.READY"
    | "UI.OPENED"
    | "UI.CLOSED"
    | "UI.RESIZE" // is this necessary ?
    | "UI.SET-CLASS" // is this necessary ?
    | "CONFIG.SET"
    | "MESSAGE.SENT"
    | "MESSAGE.RECEIVED"
    | "MESSAGE.SELECTED"
    | "USER.CONNECTED";

  interface WebchatEvent {
    type: WebchatEventType;
    value: any;
    chatId: string;
  }

  interface Window {
    botpressWebChat: Webchat;
  }
}

interface Props {
  botID: string;
}

const EmbeddedWebchat = (props: Props) => {
  const [injectScriptLoaded, setWebchatLoaded] = useState(false);
  const [webchatReady, setWebchatReady] = useState(false);

  const loadWebchatScript = () => {
    if (window.botpressWebChat) {
      return Promise.resolve(window.botpressWebChat);
    }
    if (!window.document.getElementById(INJECTION_ID)) {
      const script = window.document.createElement("script");
      script.src = `https://cdn.botpress.dev/webchat/v0/inject.js`;
      script.id = INJECTION_ID;
      window.document.body.appendChild(script);
    }
    const loadPromise = new Promise<Webchat>((resolve) => {
      const intervalId = setInterval(() => {
        if (window.botpressWebChat) {
          setWebchatLoaded(true);
          clearInterval(intervalId);
          resolve(window.botpressWebChat);
        }
      }, 100);
    });
    return loadPromise;
  };

  useEffect(() => {
    loadWebchatScript().then((webchat) => {
      webchat.onEvent(
        (event) => {
          if (event.type === "LIFECYCLE.LOADED") {
            setWebchatReady(true);
            window.botpressWebChat.sendEvent({ type: "show" }, WEBCHAT_ID);
          }
        },
        ["LIFECYCLE.LOADED", "LIFECYCLE.LOADED"],
        WEBCHAT_ID
      );
    });
  }, []);

  useEffect(() => {
    if (!injectScriptLoaded) {
      return;
    }
    if (webchatReady) {
      document.querySelector(`#${WRAPPER_ID}>div`)?.remove();
    }
    const webchatConfig = {
      botId: props.botID,
      clientId: props.botID,
      hostUrl: "https://cdn.botpress.cloud/webchat/v0",
      messagingUrl: "https://messaging.botpress.cloud",
      stylesheet: `${window.location.origin}/webchat-stylesheet.css`,
      showConversationsButton: false,
      hideWidget: true,
      disableAnimations: true,
      className: "webchatIframe",
      showPoweredBy: true,
      enableTranscriptDownload: false,
      showCloseButton: false,
      closeOnEscape: false,
      containerWidth: encodeURIComponent("100%"),
      layoutWidth: encodeURIComponent("100%"),
      // These 3 should use real bot info
      botName: "awesome-plants",
      botConversationDescription:
        "Chat with this bot built surprisingly fast in Botpress",
      composerPlaceholder: `Chat with Bot NAME`, // TODO replace with bot name from static file
      // remove this when we have a real bot
      chatId: WEBCHAT_ID,
    };

    window.botpressWebChat.init(webchatConfig, `#${WRAPPER_ID}`);
  }, [injectScriptLoaded]);

  return (
    <div id={WRAPPER_ID} className="webchatContainer">
      {!webchatReady && <div>loading</div>}
    </div>
  );
};

export default EmbeddedWebchat;
