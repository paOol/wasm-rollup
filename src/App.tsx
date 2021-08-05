import React, { useEffect, useState } from 'react';
// import { AsBind } from 'as-bind';

// // @ts-ignore
// import { useAsBind } from 'use-as-bind';

export default function App() {
  const [wasmAdd, setWasmAdd] = useState<any>();

  useEffect(() => {
    (async () => {
      //  const wasm = fetch('main.wasm');

      WebAssembly.instantiateStreaming(fetch('main.wasm')).then((obj) => {
        console.log('obj', obj);
        setWasmAdd(obj.instance.exports);
        // Call an exported function:
        let test = obj.instance.exports.add(1, 2);

        console.log('test', test);
      });
    })();
  }, []);

  // const { loaded, instance, error } = useAsBind(wasm);
  //  console.log('loaded, instance, error', loaded, instance, error);

  return (
    <>{wasmAdd && <p> Rollup + TypeScript + React = {wasmAdd.add(31, 2)}</p>}</>
  );
}
