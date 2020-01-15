import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const injectedJavascript = `(function() {
    window.WebViewBridge = {
      onMessage: function() {
        return null;
      },
      send: function(data) {
        window.postMessage(data, '*');
      },
    };
    var event = new Event('WebViewBridge');
    window.dispatchEvent(event);
  })()`;

  const generateOnMessageFunction = data =>
    `(function() {
      window.WebViewBridge.onMessage(${JSON.stringify(data)});
    })()`;

  const sendMessageToWebView = message => {
    WebViewRef.injectJavaScript(generateOnMessageFunction(message));
  };
  const sendMessageToWeb = () => {
    const clientResponseCode = `
      window.postMessage(${JSON.stringify('dsafasdf')}, "*");
      true;
    `;
     WebViewRef.injectJavaScript(clientResponseCode);
    if (WebViewRef) {
      WebViewRef.injectJavaScript(clientResponseCode);
    }
    // WebViewRef.postMessage("some message");
  };
  setTimeout(() => {
    // window.ReactNativeWebView = window['ReactAPI36_0_0NativeWebView'];
    if (WebViewRef) {
      alert("posting");
      // sendMessageToWebView('send message')
      // WebViewRef.postMessage('data');

      WebViewRef.postMessage("red");
    } else {
      WebViewRef.postMessage("red");
      alert("webview not exits");
    }
  }, 3000);
  // const postMessage = ()=>{
  //   window.ReactNativeWebView.postMessage('data');
  // }
  let WebViewRef;

  const INJECTED_JAVASCRIPT = `(function() {
    // This is the important part!
    if (!window.ReactNativeWebView) {
      window.ReactNativeWebView = window['ReactABI33_0_0NativeWebView'];
    }
    // End of the important part! Now continue using it as usual

    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
})();`;
  return (
    <View style={{ flex: 1 }}>
      <Button title="no function" style={{ paddingTop: 100, marginTop: 100 }} />
      <Button
        title="enter"
        onPress={sendMessageToWeb}
        style={{ paddingTop: 399, marginTop: 300 }}
      />
      <WebView
        useWebKit={true}
        ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
        javaScriptEnabled={true}
        // injectedJavaScript={INJECTED_JAVASCRIPT}
        // source={{ html }}
        // onMessage={event => {
        //   alert(event.nativeEvent.data);
        // }}
        onLoadEnd={() => WebViewRef.postMessage("red")}
        source={{
          uri:
            "https://ecampus-dev.hsu.edu.hk/moodle/webview_new_testing_web/index.html"
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
