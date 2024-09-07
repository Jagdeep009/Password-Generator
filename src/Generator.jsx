import { useCallback, useEffect, useState, useRef } from "react";
import "./Generator.css";

export default function Generator() {
    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [symbolAllowed, setsymbolAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const GeneratePassword = () => {
        let pass = "";
        let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        if (numAllowed)  str += "1234567890";
        if (symbolAllowed)  str += "~!@#$%^&*()_-+=?";
        for (let i=1; i<=length; i++) {
            pass += str.charAt(Math.floor(Math.random() * str.length-1))
        }
        setPassword(pass)
    }

    useEffect(()=>{
        GeneratePassword();
    },[length,numAllowed,symbolAllowed]);

    const passwordRef = useRef(null);

    const copyPassword = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)
    },[password])


    return (
        <div className="Generator p-5">
            <h2>Choose a Password type</h2>
            <div>
                <span>Random</span>
                <span>Pin</span>
            </div>
            <h2>Customise your password</h2>
            <div>
                <label htmlFor="range">Characters</label>
                <input type="range" name="" id="range" value={length} min={4} max={20} onChange={(e)=>setLength(e.target.value)} />
                <span>{length}</span>
            </div>
            <div className="d-flex">
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="numbers">Numbers</label>
                    <input className="form-check-input" type="checkbox" role="switch" id="numbers" checked={numAllowed} onChange={()=>setNumAllowed(!numAllowed)}/>
                </div>
                <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="symbols">Symbols</label>
                    <input className="form-check-input" type="checkbox" role="switch" id="symbols" checked={symbolAllowed} onChange={()=>setsymbolAllowed(!symbolAllowed)} />
                </div>
            </div>
            <h2>Generated password</h2>
            <input type="text" name="" id="" readOnly value={password} ref={passwordRef} />
            <button onClick={copyPassword}>Copy to clipboard</button>
            <button onClick={GeneratePassword}>Regenerate</button>
        </div>
    )
}