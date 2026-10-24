import { describe, expect, it } from "vitest";
import { sumFn } from "../src/services/sum";

describe("O teste deve testar a função de somar", () => {
    it("Soma 1 + 1 tem que ser igual a 2 e 0", async() => {
        const response = sumFn(1, 1)
        expect(response).
        toEqual({ sum: 2, sub: 0 })
    })
    it("Soma e subtração tem de ser igual a 2 e 0", () => {
        const response = sumFn(1, 1)
        expect(response.sum).toBe(2)
        expect(response.sub).toBe(0)
    })
})