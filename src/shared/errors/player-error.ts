import { BaseError } from './base-error';

  export class PlayerIdRequiredError extends BaseError {
    constructor() {
      super('Player ID is required');
      this.name = 'PlayerIdRequiredError';
      this.statusCode = 400;
    }
  }
  
  export class PlayerInvalidIdError extends BaseError {
    constructor() {
      super('Player ID must be a valid number');
      this.name = 'PlayerInvalidIdError';
      this.statusCode = 400;
    }
  }
  
  export class PlayerNotFoundError extends BaseError {
    constructor() {
      super('Player not found');
      this.name = 'PlayerNotFoundError';
      this.statusCode = 404;
    }
  }