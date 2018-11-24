import {Cat} from "./cat";
import {Position} from "./Point";
import {ITracingMode} from "./ITracingMode.interface";
import * as MersenneTwister from 'mersenne-twister';


export class ClassicalTracingMode implements ITracingMode {
    private r: number;

    constructor(private readonly c: number, private readonly searchDomain: Position) {
    }

    private updateVelocity(actualVelocity: Position, xbest: Position): Position {
        return new Position(
            actualVelocity.x + this.r * this.c * (xbest.x - actualVelocity.x),
            actualVelocity.y + this.r * this.c * (xbest.y - actualVelocity.y));
    }

    private static limitRange(value: number, min: number, max: number) {
        return Math.max(min, Math.min(max, value));
    }

    private checkVelocity(cat: Cat, velocity: Position): Position {
        // <# TO
        const catPosition = cat.Position;
        const limit = (x) => ClassicalTracingMode.limitRange(x, this.searchDomain.x, this.searchDomain.x);
        return new Position(
            limit(catPosition.x),
            limit(catPosition.y)
        );
    }

    trace(cat: Cat, xbest: Position): void {
        this.r = MersenneTwister.random();
        cat.Position = this.checkVelocity(cat, this.updateVelocity(cat.Velocity, xbest));
    }
}