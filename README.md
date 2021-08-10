## Usage

write functions in `main.go`
register them globally with `js.Global().Set("helloWorld", js.FuncOf(helloWorld))`

run `yarn gobuild` to compile into `main.wasm`

the rollup config runs the compiled program

`yarn dev`

in the browser console, test with  `add(1,2)` and you should get `3`
`helloWorld()` will output 'Hello World from GO'
