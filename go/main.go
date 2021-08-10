package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	// open channel to prevent closing the go app
	c := make(chan int)
	//c := make(chan struct{}, 0)
	fmt.Println("Hello World line 17")
	addJSGlobals()
	addGOtoDOM()
	addFunctionsToJS()
	<-c
}

func addGOtoDOM() {
	document := js.Global().Get("document")

	myH1 := document.Call("createElement", "h1")
	myH1.Set("innerText", "Hello from GO")

	document.Get("body").Call("appendChild", myH1)
}

// reads from hello.js and outputs to console
func addJSGlobals() {
	num := js.Global().Call("add", 1, 1)
	println(num.Int())

	s := js.Global().Call("hello").String()
	println(s)

	test := js.Global().Get("test").String()
	println(test)

	js.Global().Get("obj").Set("keys", "123445")
}

// interface{}  is like  the typescript "any" type
func add(this js.Value, inputs []js.Value) interface{} {
	return inputs[0].Float() + inputs[1].Float()
}

func helloWorld(this js.Value, inputs []js.Value) interface{} {
	return "Hello World from GO"
}

func addFunctionsToJS() {
	js.Global().Set("add", js.FuncOf(add))
	js.Global().Set("helloWorld", js.FuncOf(helloWorld))
}
