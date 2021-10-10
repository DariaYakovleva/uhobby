import React, {useEffect} from 'react';

import "@vkontakte/vkui/dist/vkui.css";
import '@vkontakte/vkui/dist/unstable.css';
import { Text } from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/unstable";

export const YouHobbies = (props) => {
    const [allHobbies, setAllHobbies] = React.useState([]);
    const [selectedHobbies, setSelectedHobbies] = React.useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'accept': 'application/json'},
            credentials: 'include'
        };
        fetch("http://0.0.0.0:90/get_all_hobbies", requestOptions)
            .then(response => response.json()).then(setAllHobbies);
    }, [])

    const options = allHobbies.map(item => ({ label: item.value, value: item.label }));

    const handleOnChange = (value) => {
        setSelectedHobbies(value);
        props.setHobbies(value);
    };

    const filterOptions = (value, option, getOptionLabel) => {
        return getOptionLabel(option).toLowerCase().includes(value.toLowerCase())
    }

    const colorsChipsProps = {
        value: selectedHobbies,
        onChange: handleOnChange,
        options: options,
        filterFn: filterOptions,
        top:"Укажи занятия, которые тебе нравятся",
        placeholder:"Например, медитация",
        emptyText: 'Попробуй другое название'
    };

    return (
        <React.Fragment>
            <h1 size="lg" color="white">Расскажи немного о себе</h1>
            <Text weight="regular" style={{ marginBottom: 15, color: 'grey' }}>
                Укажи занятия, которые тебе нравятся.
            </Text>
            <ChipsSelect style={{ }} {...colorsChipsProps}/>
        </React.Fragment>
    );
}
