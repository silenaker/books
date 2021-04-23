### 为什么增加TCP连接数可以提升整体资源加载性能(降低整体资源加载时延)

1. 假设只有一条TCP连接，连接(TCP/TLS)建立时延为*T*，RTT(往返时延)为*R*，网络带宽是*K*(byte/s)(上下行带宽相同)，页面有*N*个资源需要加载，所有资源请求总大小为*S1*(Byte)，所有资源响应总大小为*S2* (Byte)，那么  

    *RTT_COUNT = N*  
    *TRANSFER_SUM = (S1 + S2) / K*  
    *SUM = T + R * RTT_COUNT + TRANSFER_SUM*

2. 假设有*M*条TCP连接，所有TCP连接建立总时延为*T'*，*N >= M*，其他条件同上，那么

    *T' = T*  
    *RTT_COUNT_MIN = ceil(N / M)*  
    *RTT_COUNT_MAX = N - M + 1*  
    *TRANSFER_SUM = (S1 + S2) / K*  
    *SUM_MIN = T' + R * RTT_COUNT_MIN + TRANSFER_SUM*  
    *SUM_MAX = T' + R * RTT_COUNT_MAX + TRANSFER_SUM*

分析以上公式可以得出1和2的区别主要在于**RTT总次数有所不同**  
因此**增加TCP连接数可以减少RTT总次数**，并且根据各资源大小以及网络状况，2中RTT总次数也在一个特定的区间里变化，RTT总次数最小的情况发生在，所有TCP连接每次都同时加载新的资源，并且它们的加载时间都相同，这样可以最大化利用所有TCP连接，最大的情况发生在，在所有资源整体加载时间内，全部连接只有一条连接可用，其他连接全部被大资源加载所阻塞，这样就退化到只有一条TCP连接可用的场景（1场景）

    