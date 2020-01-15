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
    //  WebViewRef.injectJavaScript(clientResponseCode);
    if (WebViewRef) {
      WebViewRef.injectJavaScript(clientResponseCode);
    }
    // WebViewRef.postMessage("some message");
  };
  const sendMessageToWebOld = () => {
    WebViewRef.postMessage("red");
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


  return (
    <View style={{ flex: 1 }}>
      <Button title="no function" style={{ paddingTop: 100, marginTop: 100 }} />
      <View style={{flexDirection:'row',alignContent:'center'}}>
      <Button
        title="New Post Message"
        onPress={sendMessageToWeb}
        style={{ paddingTop: 399, marginTop: 300 }}
      />
      <Button
        title="Old Post Message"
        onPress={sendMessageToWebOld}
        style={{ paddingTop: 399, marginTop: 300 }}
      />
      </View>
      <WebView
        useWebKit={true}
        ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
        javaScriptEnabled={true}
        // injectedJavaScript={INJECTED_JAVASCRIPT}
        // source={{ html }}  
        onMessage={event => {
          alert('event.nativeEvent.data');
        }}
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
