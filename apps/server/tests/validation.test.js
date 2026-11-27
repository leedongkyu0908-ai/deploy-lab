import { test } from 'node:test'
import assert from 'node:assert/strict'
import { RULES, validate } from '../rules.js'
test('입력 검증: 문자열·공백·경계·trim', () => {
  for (const x of [null,42,{},[], '   ']) assert.ok(validate(x).error)
  assert.equal(validate(' 가나 ').text,'가나')
  assert.ok(validate('a'.repeat(RULES.maxLength+1)).error)
  assert.equal(validate('a'.repeat(RULES.maxLength)).text.length,RULES.maxLength)
  assert.ok(validate('a'.repeat(RULES.minLength-1)).error)
})
test('002 최대 20자: trim 후 0자 거절·1자·20자 성공·21자 거절 (한글·영문)', () => {
  assert.equal(RULES.maxLength, 20)
  for (const ch of ['a', '가']) {
    assert.ok(validate('').error)
    assert.equal(validate(ch).text, ch)
    assert.equal(validate(ch.repeat(20)).text.length, 20)
    assert.ok(validate(ch.repeat(21)).error)
    assert.equal(validate(`  ${ch.repeat(20)}  `).text.length, 20)
  }
})
