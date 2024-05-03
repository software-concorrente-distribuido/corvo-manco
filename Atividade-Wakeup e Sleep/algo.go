package main

import (
	"fmt"
	"sync"
	"time"
)

type Buffer struct {
	cond   *sync.Cond
	queue  []int
	maxLen int
}

func NewBuffer(maxLen int) *Buffer {
	return &Buffer{
		cond:   sync.NewCond(&sync.Mutex{}),
		queue:  make([]int, 0),
		maxLen: maxLen,
	}
}

func (b *Buffer) Produce(item int) {
	b.cond.L.Lock()
	for len(b.queue) == b.maxLen {
		fmt.Println("Buffer is full")
		b.cond.Wait()
	}
	b.queue = append(b.queue, item)
	fmt.Printf("Produced: %d\n", item)
	b.cond.Signal()
	b.cond.L.Unlock()
}

func (b *Buffer) Consume() int {
	b.cond.L.Lock()
	for len(b.queue) == 0 {
		fmt.Println("Buffer is null")
		b.cond.Wait()
	}
	item := b.queue[0]
	b.queue = b.queue[1:]
	fmt.Printf("Consumed: %d\n", item)
	b.cond.Signal()
	b.cond.L.Unlock()
	return item
}

func main() {
	buffer := NewBuffer(5)
	wg := sync.WaitGroup{}

	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			for j := 0; j < 5; j++ {
				item := id*10 + j
				buffer.Produce(item)
				time.Sleep(time.Millisecond * 500)
			}
		}(i)
	}

	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			for j := 0; j < 5; j++ {
				buffer.Consume()
				time.Sleep(time.Millisecond * 700)
			}
		}(i)
	}

	wg.Wait()
}
