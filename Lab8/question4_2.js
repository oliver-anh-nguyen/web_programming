function LinkedList() {

}

LinkedList.prototype.add = function (e) {
    if (this.value === undefined) {
        this.value = e;
        this.next = null;
    } else {
        let cur = this;
        while(cur.next) {
            cur = cur.next;
        }
        cur.next = {value: e, next: null};
    }
}

LinkedList.prototype.remove = function (e) {
    let cur = this;
    let prev = null;

    while (cur) {
        if (cur.value === e) {
            if (prev == null) {
                this.value = cur.next.value;
                this.next = cur.next.next;
            } else {
                prev.next = cur.next;
            }
            return true;
        }
        prev = cur;
        cur = cur.next;
    }
    return false;
}

LinkedList.prototype.printHelper = function (list, result) {
    if (list.next == null) {
        result += list.value;
        return result;
    }
    result += list.value + ',';
    return this.printHelper(list.next, result);
}

LinkedList.prototype.print = function () {
    let result = 'LinkedList{';
    result = this.printHelper(this, result);
    result += '}';
    console.log(result);
}

let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
linkedlist.print();
linkedlist.remove(2);
linkedlist.print();