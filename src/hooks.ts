import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const errorAlerrt = (message: string ) =>
Alert.alert('Error', message, [
  {text: 'OK', onPress: () => {}},
]);

export const useErrors = () => {
    const [errors, setErrors] = useState<string | undefined>();
    useEffect(() => {
        if(errors) errorAlerrt(errors)
      }, [errors])
    return setErrors
}