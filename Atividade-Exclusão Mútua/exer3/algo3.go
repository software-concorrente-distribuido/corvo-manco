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
		mutexA.Lock()
		CA = true
		mutexA.Unlock()

		for CB {
		}

		fmt.Println("Região Crítica A")

		mutexA.Lock()
		CA = false
		mutexA.Unlock()

		fmt.Println("Processamento A")
	}
}

func processoB(wg *sync.WaitGroup, mutexA, mutexB *sync.Mutex) {
	defer wg.Done()
	for {
		mutexB.Lock()
		CB = true
		mutexB.Unlock()

		for CA {
		}

		fmt.Println("Região Crítica B")

		mutexB.Lock()
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
