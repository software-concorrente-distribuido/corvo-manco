package main

import (
	"fmt"
	"sync"
	"time"
)

func task(id int, sem chan struct{}, wg *sync.WaitGroup) {
	defer wg.Done()

	sem <- struct{}{}
	fmt.Printf("Goroutine %d entrou na região crítica.\n", id)

	time.Sleep(time.Second * time.Duration(id))

	<-sem
	fmt.Printf("Goroutine %d saiu da região crítica.\n", id)
}

func main() {
	maxGoroutines := 3
	sem := make(chan struct{}, maxGoroutines)

	var wg sync.WaitGroup

	for i := 1; i <= 10; i++ {
		wg.Add(1)
		go task(i, sem, &wg)
	}

	wg.Wait()
	fmt.Println("Todas as goroutines completaram a execução.")
}
