import { useState, useEffect, useMemo } from "react";
import "./styles.css";

// Store
import { setPresetsAction, getPresetsAction } from "./store";

// Styled

import { Wrapper, Item, Row } from "./styled";

// Helpers
const DEFAULT_THEME = { 1: "red", 2: "blue" };

export default function App() {
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [presets, setPresets] = useState({});
    const [activePreset, setActivePreset] = useState("");
    const [presetName, setPresetName] = useState("");

    const presetNameList = useMemo(() => Object.keys(presets), [presets]);

    const onChangePreset = (event) => {
        const value = event.target.value;
        setActivePreset(value);
        setTheme(presets[value]);
    };

    const onChangeTheme = (field) => (event) => {
        setTheme({ ...theme, [field]: event.target.value });
    };

    const savePreset = () => {
        if (!presetName) {
            alert("Preset name is required");
            return;
        }

        setPresets({ ...presets, [presetName]: theme });
        setPresetsAction({ ...presets, [presetName]: theme });
        setActivePreset(presetName);
        setPresetName("");
    };

    useEffect(() => {
        setPresets(getPresetsAction());
    }, []);

    return (
        <Wrapper>
            {Boolean(presetNameList.length) && (
                <>
                    <h3>Select preset</h3>
                    <select value={activePreset} onChange={onChangePreset}>
                        {presetNameList.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                </>
            )}
            <Row>
                <Item color={theme[1]} />
                <Item color={theme[2]} />
            </Row>
            <h3>Change color schema </h3>
            <input type="text" value={theme[1]} onChange={onChangeTheme(1)} />
            <input type="text" value={theme[2]} onChange={onChangeTheme(2)} />
            <h3>Create preset</h3>
            <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
            />
            <br />
            <button onClick={savePreset} type="button">
                save preset
            </button>

            <br />
        </Wrapper>
    );
}


// store
export const getPresetsAction = () => {
    try {
        return JSON.parse(localStorage.getItem("presets")) || {};
    } catch (e) {
        return e;
    }
};

export const setPresetsAction = (data) => {
    try {
        localStorage.setItem("presets", JSON.stringify(data));
    } catch (e) {
        return e;
    }
};


// styled
import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & input {
    width: 500px;
    margin: 5px;
  }
`;

export const Item = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
  border-radius: 15px;
  margin: 10px;
`;

export const Row = styled.section`
  display: flex;
  margin: 10px auto;
`;