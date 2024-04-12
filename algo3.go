package main

import (
	"fmt"
	"sync"
)

var (
	CA bool
	CB bool
)

func processoA(wg *sync.WaitGroup, mutexA, mutexB *sync.Mutex) {
	defer wg.Done()
	for {
		for CB {}
		mutexA.Lock()
		CA = true
		fmt.Println("Região Crítica A")
		CA = false
		mutexA.Unlock()
		fmt.Println("Processamento A")
	}
}

func processoB(wg *sync.WaitGroup, mutexA, mutexB *sync.Mutex) {
	defer wg.Done()
	for {
		for CA {}
		mutexB.Lock()
		CB = true
		fmt.Println("Região Crítica B")
		CB = false
		mutexB.Unlock()
		fmt.Println("Processamento B")
	}
}

func main() {
	var wg sync.WaitGroup
	mutexA := &sync.Mutex{}
	mutexB := &sync.Mutex{}

	wg.Add(2)
	go processoA(&wg, mutexA, mutexB)
	go processoB(&wg, mutexA, mutexB)

	wg.Wait()
}
