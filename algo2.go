package main

import (
	"fmt"
	"sync"
	"time"
)

var vez = 'A'

func processoA(wg *sync.WaitGroup, mutex *sync.Mutex) {
	defer wg.Done()
	for {
        for vez == 'B' {}
        mutex.Lock()
        fmt.Println("Região Crítica A")
        vez = 'B'
        fmt.Println("Processamento A")
        mutex.Unlock()
	}
}

func processoB(wg *sync.WaitGroup, mutex *sync.Mutex) {
	defer wg.Done()
	for {

        for vez == 'A' {}
        mutex.Lock()
        fmt.Println("Região Crítica B")
        vez = 'A'
        fmt.Println("Processamento B")asassa.txt
        mutex.Unlock()

	}
}

func main() {
	var wg sync.WaitGroup
	mutex := &sync.Mutex{}

	wg.Add(2)
	go processoA(&wg, mutex)
	go processoB(&wg, mutex)

	wg.Wait()
}
