package main

import (
	"fmt"
	"runtime"
)

var (
	CA bool
	CB bool
)

func processoA() {
	for {
		CA = true
		for CB {
			runtime.Gosched()
		}
		fmt.Println("Região Crítica A")
		CA = false
		fmt.Println("Processamento A")
	}
}

func processoB() {
	for {
		CB = true
		for CA {
			runtime.Gosched()
		}
		fmt.Println("Região Crítica B")
		CB = false
		fmt.Println("Processamento B")
	}
}

func main() {
	go processoA()
	go processoB()
	select {}
}
