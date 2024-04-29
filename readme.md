# BullMQ PoC Repository

This repository serves as a **Proof of Concept (PoC)** for testing **BullMQ**
capabilities. BullMQ is a powerful Node.js library that implements a fast and
robust queue system built on top of **Redis**.

## BullMQ Features

- **Exactly Once Semantics**: BullMQ ensures that every message is delivered
  exactly once, even in worst-case scenarios.
- **Horizontal Scalability**: Easily scale by adding more workers to process
  jobs in parallel.
- **Consistent and High-Performant**: BullMQ leverages efficient Lua scripts and
  pipelining to achieve high throughput from Redis.
- **Distributed Job Execution**:
  - LIFO and FIFO job processing.
  - Priorities for jobs.
  - Delayed and scheduled jobs based on cron specifications.
  - Retries for failed jobs.
  - Concurrency settings per worker.
  - Threaded (sandboxed) processing functions.
  - Automatic recovery from process crashes.
  - Parent-child dependencies.

## Getting Started

This repository is using [Deno](https://deno.com/) for Javascript runtime and
developed using Typescript. It is recommended to install Deno plugin installed
on your VSCode.

1. **Install Dependencies**:
   - Make sure you have **Deno** installed.
   - Set up a **Redis** instance. You can run it on Docker container or install
     it on your machine

2. **Clone this Repository**:
   ```bash
   git clone https://github.com/your-username/bullmq-poc.git
   cd bullmq-poc
   ```

3. **Run the Project**:
   - Start your Redis server
   - Run following command to run the worker `deno task dev`
   - Run following command to add job to the queue `deno task add-job`
