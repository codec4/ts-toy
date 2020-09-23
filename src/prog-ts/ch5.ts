//##############################################################################
//##############################################################################
// Classes and Inheritance
//##############################################################################
//##############################################################################

type Color = 'Black' | 'White';
type Side = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// A set of coordinates for a piece
class Position {
  constructor(private file: Side, private rank: Rank) {}

  public distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    };
  }
}

// A chess piece
abstract class Piece {
  protected position: Position;
  constructor(private readonly color: Color, file: Side, rank: Rank) {
    this.position = new Position(file, rank);
  }

  public moveTo(position: Position) {
    this.position = position;
  }

  public abstract canMoveTo(position: Position): boolean;
}

// ...
class King extends Piece {
  canMoveTo(position: Position) {
    let distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}

// class Queen extends Piece {}
// class Bishop extends Piece {}
// class Knight extends Piece {}
// class Rook extends Piece {}
// class Pawn extends Piece {}

// Represents a chess game
class Game {
  private pieces = Game.makePieces();

  private static makePieces() {
    return [
      // Kings
      new King('White', 'E', 1),
      new King('Black', 'E', 8)
    ];
  }
}

//##############################################################################
//##############################################################################
// Using this as a Return Type
//##############################################################################
//##############################################################################

class SetDS {
  has(value: number): boolean {
    // ...
    return true;
  }

  add(value: number): this {
    return this;
  }
}

class MutableSet extends SetDS {
  delete(value: number): boolean {
    // ...
    return true;
  }
}

//##############################################################################
//##############################################################################
// Using this as a Return Type
//##############################################################################
//##############################################################################

type Sushi = {
  calories: number;
  salty: boolean;
  tasty: boolean;
};

interface ISushi {
  calories: number;
  salty: boolean;
  tasty: boolean;
}

type Food = {
  calories: number;
  tasty: boolean;
};

type TSushi = Food & {
  salty: boolean;
};

type Cake = Food & {
  sweet: boolean;
};

interface IFood {
  calories: number;
  tasty: boolean;
}
interface IISushi extends IFood {
  salty: boolean;
}
interface ICake extends IFood {
  sweet: boolean;
}

// interface IA {
//   good(x: number): string;
//   bad(x: number): string;
// }

// interface IB extends IA {
//   good(x: string | number): string;
//   bad(x: string): string;
// } // Error: Interface 'B' incorrectly extends interface 'A'. Type 'number' is
// not assignable to type 'string'

type TA = {
  good: (x: number) => string;
  bad: (x: number) => string;
};

type IB = TA & {
  good: (x: string | number) => string;
  bad: (x: string) => string;
};

// Declaration Merging
interface User {
  name: string;
}

interface User {
  age: number;
}

// interface User {
//   age: string;
// } // Error: Subsequent property declaration must have the same type.
// Property 'age' must be of type 'string',
// but here has type 'number';

let a: User = {
  name: 'Ashley',
  age: 30
};
