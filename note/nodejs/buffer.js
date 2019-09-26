/**
 * Buffer:类数组对象
 * 存储二进制数据
 */
/**
 * Buffer.from(array) 返回一个新的 Buffer，其中包含提供的八位字节数组的副本。
 * Buffer.from(arrayBuffer[, byteOffset [, length]]) 返回一个新的 Buffer，它与给定的 ArrayBuffer 共享相同的已分配内存。
 * Buffer.from(buffer) 返回一个新的 Buffer，其中包含给定 Buffer 的内容的副本。
 * Buffer.from(string[, encoding]) 返回一个新的 Buffer，其中包含提供的字符串的副本。
 */
const buf = Buffer.from('fuck you')
console.log(buf)