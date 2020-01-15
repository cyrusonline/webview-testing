import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {

setTimeout(()=>{
  if(WebViewRef){
    alert('posting')
    WebViewRef.postMessage('data');

  }else{
    alert('webview not exits')
  }
},3000)
  // const postMessage = ()=>{
  //   window.ReactNativeWebView.postMessage('data');
  // }
  let WebViewRef;
  return (
    <WebView
    useWebKit={true}
    ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
    // source={{ html }}
    // onMessage={event => {
    //   alert(event.nativeEvent.data);
    // }}
      source={{
        uri:
          "https://ecampus-dev.hsu.edu.hk/moodle/webview_new_testing_web/index2.html"
      }}
      style={{ marginTop: 20 }}
    />
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
