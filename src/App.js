import { useState, useEffect, useMemo } from "react";
import "./index.css";

import { setPresetsAction, getPresetsAction } from "./store";
import { allKeysArray } from "./constants";

import { Wrapper, Keyboard, Row, Key, Input, Button } from "./styled";

const DEFAULT_THEME = allKeysArray.map((button, index) => {
    return { [`${ button }_${ index }`]: '#ffffff' }
});

export default function App() {
    const [theme, setTheme] = useState('');
    const [presets, setPresets] = useState({});
    const [activePreset, setActivePreset] = useState('');
    const [presetName, setPresetName] = useState('');
    const [color, setColor] = useState('#ffffff');

    const presetNameList = useMemo(() => Object.keys(presets), [presets]);

    const onInputColorChange = (e) => {
        const inputColor = e.target.value;
        setColor(inputColor);
    }

    const onChangePreset = (e) => {
        const value = e.target.value;
        setActivePreset(value);
        setTheme(presets[value]);
    };

    const onChangeTheme = (e) => {
        setTheme({ ...theme, [e.target.id]: color });
    };

    const savePreset = () => {
        if (!presetName) {
            alert('Preset name is required');
            return;
        }

        setPresets({ ...presets, [presetName]: theme });
        setPresetsAction({ ...presets, [presetName]: theme });
        setActivePreset(presetName);
        setPresetName('');
    };

    useEffect(() => {
        setPresets(getPresetsAction());
    }, []);

    return (
        <Wrapper>
            {Boolean(presetNameList.length) && (
                <>
                    <h3>Select preset</h3>
                    <select value={ activePreset } onChange={ onChangePreset }>
                        {presetNameList.map((item, index) => (
                            <option key={ `${ item }_${ index }` }>{ item }</option>
                        ))}
                    </select>
                </>
            )}
            <Keyboard>
                <Row>
                    {
                        allKeysArray.map((item, index) => {
                                const id = `${ item }_${ index }`
                                return <Key key={ `${item}__${index}` }
                                            id={ id }
                                            color={ theme[id] }
                                            onClick={ onChangeTheme }
                                >{ item }</Key>
                        })
                    }
                </Row>
            </Keyboard>

            <h3>Change color schema </h3>
            <input type='color' onChange={ onInputColorChange } value={ color }/>
            <Input
                type="text"
                value={ presetName }
                onChange={ (e) => setPresetName(e.target.value) }
                placeholder = 'Enter Preset name'
            />
            <Button onClick={ savePreset }>
                Save preset
            </Button>
        </Wrapper>
    );
};