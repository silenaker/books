### 哈夫曼树

#### 定义

- 假设有一个*N*颗二叉树的集合
- 集合中的每棵树都具有*M*个相同的叶子结点
- 定义根结点到叶子结点的路径(深度)为该叶子结点的*路径长度*
- 每个叶子结点都有一个值，称之为该叶子结点的*权重*
- 叶子结点的*路径长度*与*权重*之**积**称之为该叶子结点的*加权路径长度*
- 树的所有叶子结点的*加权路径长度*之**和**称之为该树的*加权路径长度*
- 该集合中*加权路径长度*最小的树即为**哈夫曼树**

#### 哈夫曼树的性质

- 哈夫曼树中*权重*越大的叶子结点的*路径长度*越短
- 该集合中至少有一颗哈夫曼树
- 哈夫曼树内部结点的度数为2
- 哈夫曼树的结点总数为*2M - 1*

#### 算法实现
```typescript
interface Node {
    leftChild: Node | null,
    rightChild: Node | null,
    weight?: number
}

function construct(weights: number[]): Node {
    const removeMin = nodes => {
        let minIndex = 0
        for (let i = 1;i < nodes.length;i++) {
            if (nodes[i].weight < nodes[minIndex].weight) {
                minIndex = i
            }
        }
        const minNode = nodes[minIndex]
        nodes.splice(minIndex, 1)
        return minNode
    }
    
    const nodes = weights.map(weight => ({
        leftChild: null,
        rightChild: null,
        weight
    }))

    while (nodes.length > 1) {
        const minNode1 = removeMin(nodes)
        const minNode2 = removeMin(nodes)
        nodes.push({
            leftChild: minNode1,
            rightChild: minNode2,
            weight: minNode1.weight + minNode2.weight
        })
    }

    return nodes[0]
}
```