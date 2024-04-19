package main

import (
	"fmt"
	"runtime"
)

var (
	CA bool
	CB bool
)

func ProcessoA() {
	for {
		for CB {
			runtime.Gosched()
		}
		CA = true
		fmt.Println("Região Crítica A")
		CA = false
		fmt.Println("Processamento A")
	}
}

func ProcessoB() {
	for {
		for CA {
			runtime.Gosched()
		}
		CB = true
		fmt.Println("Região Crítica B")
		CB = false
		fmt.Println("Processamento B")
	}
}

func main() {
	CA = false
	CB = false
	go ProcessoA()
	go ProcessoB()
	select {}
}
