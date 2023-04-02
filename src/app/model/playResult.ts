/**
 * RPS API
 * Rock, paper & scissors
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { MoveCodeEnum } from './moveCodeEnum';
import { OutcomeCodeEnum } from './outcomeCodeEnum';

export interface PlayResult { 
    moveByUser: MoveCodeEnum;
    moveByMachine: MoveCodeEnum;
    outcome: OutcomeCodeEnum;
}