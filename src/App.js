import { useState, useEffect, useMemo } from "react";
import "./index.css";

import { setPresetsAction, getPresetsAction } from "./store";
import { allKeysArray } from "./constants";

import { Wrapper, Keyboard, Row, Key } from "./styled";

const DEFAULT_THEME = allKeysArray.map((button, index) => {
    return { [`${ button }_${ index }`]: '#ffffff' }
});

export default function App() {
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [presets, setPresets] = useState({});
    const [activePreset, setActivePreset] = useState('');
    const [presetName, setPresetName] = useState('');

    const presetNameList = useMemo(() => Object.keys(presets), [presets]);

    const onChangePreset = (e) => {
        const value = e.target.value;
        setActivePreset(value);
        setTheme(presets[value]);
    };

    const onChangeTheme = (key) => (e) => {
        setTheme({ ...theme, [key]: e.target.value });
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
                        allKeysArray.map((item, index) =>
                            <Key key={ `${ item }__${ index }` }
                                 onClick={ onChangeTheme(`${ item }_${ index }`) }
                            >{ item }</Key>
                        )
                    }
                </Row>
            </Keyboard>

            <h3>Change color schema </h3>
            <input type="color"/>
            {/*<input type="text" value={theme[1]} onChange={onChangeTheme(1)} />*/}
            <h3>Create preset</h3>
            <input
                type="text"
                value={ presetName }
                onChange={ (e) => setPresetName(e.target.value) }
            />
            <br />
            <button onClick={ savePreset }>
                Save preset
            </button>

            <br />
        </Wrapper>
    );
};