
//1/ Explain why do we want sometimes to use setImmediate instead of using setTimeout?
// - SetTimeout: schedules a callback to run after a specific time, the functions are registered in the
// timers phase of the event loop.
// - SetImmediate: schedules a callback to run at check phase of the event loop after IO events' callbacks.


// 2/ Explain the difference between process.nextTick and setImmediate?
// - SetImmediate: schedules a callback to run at check phase of the event loop after IO events' callbacks.
// - process.nextTick: is not part of the event loop, it adds the callback into the nextTick queue.
// Node processes all the callbacks in the nextTick queue after the current operation completes
// and before the event loop continues.


// 3/ Does Node.js has window object?
// None. Node provides: global modules and methods that are automatically created for us like :
// module, global, process, buffer