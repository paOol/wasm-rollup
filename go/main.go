package main

import (
	"fmt"
	"syscall/js"
)

// func RegisterCallbacks() {
// 	js.Global().Set("add", js.FuncOf(add))
// 	js.Global().Set("helloWorld", js.FuncOf(helloWorld))
// }

func main() {
	fmt.Println("Hello World line 17")
	addJSGlobals()
}

func addJSGlobals() {
	num := js.Global().Call("add", 1, 1)
	println(num.Int())

	s := js.Global().Call("hello").String()
	println(s)

	test := js.Global().Get("test").String()
	println(test)

	js.Global().Get("obj").Set("keys", "123445")
}

// func add(a, b int) int {
// 	return a + b
// }

// func helloWorld() string {
// 	return "Hello World from GO"
// }
