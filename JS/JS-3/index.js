class IntegerSet {
    constructor(maxValue) {
      if (maxValue < 0) {
        throw new Error('Maximum value must be non-negative');
      }
      this.maxValue = maxValue;
      this.set = new Array(maxValue + 1).fill(false);
    }
  
    insert(element) {
      if (this._isValidElement(element)) {
        this.set[element] = true;
      } else {
        throw new Error(`Element ${element} is out of range (0-${this.maxValue})`);
      }
      return this;
    }
  
    delete(element) {
      if (this._isValidElement(element)) {
        this.set[element] = false;
      } else {
        throw new Error(`Element ${element} is out of range (0-${this.maxValue})`);
      }
      return this;
    }
  
    union(otherSet) {
      const newMax = Math.max(this.maxValue, otherSet.maxValue);
      const result = new IntegerSet(newMax);
      
      for (let i = 0; i <= this.maxValue; i++) {
        if (this.set[i]) result.insert(i);
      }
      
      for (let i = 0; i <= otherSet.maxValue; i++) {
        if (otherSet.set[i]) result.insert(i);
      }
      
      return result;
    }
  
    intersection(otherSet) {
      const newMax = Math.min(this.maxValue, otherSet.maxValue);
      const result = new IntegerSet(newMax);
      
      for (let i = 0; i <= newMax; i++) {
        if (this._hasElement(i) && otherSet._hasElement(i)) {
          result.insert(i);
        }
      }
      
      return result;
    }
  
    difference(otherSet) {
      const result = new IntegerSet(this.maxValue);
      
      for (let i = 0; i <= this.maxValue; i++) {
        if (this._hasElement(i)) {
          if (!otherSet._hasElement(i)) {
            result.insert(i);
          }
        }
      }
      
      return result;
    }
  
    has(element) {
      return this._isValidElement(element) && this.set[element];
    }
  
    toString() {
      const elements = [];
      for (let i = 0; i <= this.maxValue; i++) {
        if (this.set[i]) {
          elements.push(i);
        }
      }
      return `{${elements.join(', ')}}`;
    }
  
    _isValidElement(element) {
      return Number.isInteger(element) && element >= 0 && element <= this.maxValue;
    }
  
    _hasElement(element) {
      return this._isValidElement(element) && this.set[element];
    }
  }
  
  function testIntegerSet() {
    console.log('Creating set A (0-10)');
    const setA = new IntegerSet(10);
    setA.insert(1).insert(3).insert(5).insert(7).insert(9);
    console.log('Set A:', setA.toString());
  
    console.log('\nCreating set B (0-15)');
    const setB = new IntegerSet(15);
    setB.insert(2).insert(3).insert(5).insert(7).insert(11).insert(13);
    console.log('Set B:', setB.toString());
  
    console.log('\nTesting union of A and B');
    const unionAB = setA.union(setB);
    console.log('A ∪ B:', unionAB.toString());
  
    console.log('\nTesting intersection of A and B');
    const intersectionAB = setA.intersection(setB);
    console.log('A ∩ B:', intersectionAB.toString());
  
    console.log('\nTesting difference A - B');
    const differenceAB = setA.difference(setB);
    console.log('A - B:', differenceAB.toString());
  
    console.log('\nTesting difference B - A');
    const differenceBA = setB.difference(setA);
    console.log('B - A:', differenceBA.toString());
  
    console.log('\nTesting element operations');
    console.log('Does setA have 3?', setA.has(3));
    console.log('Does setA have 4?', setA.has(4));
    setA.delete(3);
    console.log('After deleting 3 from setA:', setA.toString());
    setA.insert(4);
    console.log('After inserting 4 to setA:', setA.toString());
  
    console.log('\nTesting edge cases');
    try {
      setA.insert(-1);
    } catch (e) {
      console.log('Error inserting -1:', e.message);
    }
    try {
      setA.insert(11);
    } catch (e) {
      console.log('Error inserting 11:', e.message);
    }
  }
  
  // Run the test
  testIntegerSet();


// to run use the command ->  node index.js