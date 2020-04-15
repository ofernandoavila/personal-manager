import React, { useState, useEffect } from 'react';

import { View, CheckBox, Text, StyleSheet } from 'react-native';

interface ICaixaSelecao {
    titulo: string;
}

const Checkbox = (props: ICaixaSelecao) => {

    const [isChecked, setChecked] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(props.titulo);
    }, []);

    function changeChecked () {
      setChecked(!isChecked);
    };

    return (
        <View style={styles.checkbox}>
            <CheckBox value={isChecked} onChange={changeChecked}/>
            <Text>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Checkbox;