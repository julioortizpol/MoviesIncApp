import React, { ErrorInfo } from 'react'
import { View, Text } from 'react-native';

type MyProps = {
    children: JSX.Element,
}
type MyState = {
    hasError: boolean;
    error: Error | string,
    errorInfo: ErrorInfo | string
     // like this
  };

export default class ErrorBoundries extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
  
      super(props);
  
      this.state = {
  
        hasError: false,
  
        error: '',
  
        errorInfo: '',
  
      };
  
    }
  
    static getDerivedStateFromError() {
  
      return {hasError: true};
  
    }
  
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  
      console.log('Error: ' + error);
  
      console.log('Error Info: ' + JSON.stringify(errorInfo));
  
      this.setState({
  
        error: error,
  
        errorInfo: errorInfo,
  
      });
  
    }
  
    render() {
  
      if (this.state.hasError) {
  
        return (
  
          <View
  
            style={{
  
              flex: 1,
  
              justifyContent: 'center',
  
              alignItems: 'center',
  
            }}>
  
            <Text>Oops!!! Something went wrong..</Text>
            <Text>Please come back later</Text>
  
          </View>
  
        );
  
      }
  
      return this.props.children;
  
    }
  
   }