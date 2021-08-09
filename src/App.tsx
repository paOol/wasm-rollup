import React, { useEffect, useState } from 'react';
// import { AsBind } from 'as-bind';

// // @ts-ignore
// import { useAsBind } from 'use-as-bind';

export default function App() {
  const [wasmAdd, setWasmAdd] = useState<any>();

  useEffect(() => {
    (async () => {})();
  }, []);

  // const { loaded, instance, error } = useAsBind(wasm);
  //  console.log('loaded, instance, error', loaded, instance, error);

  return (
    <>
      {wasmAdd && <p> Rollup + TypeScript + React = {wasmAdd.add(31, 2)}</p>}
      <div>hello</div>
    </>
  );
}
