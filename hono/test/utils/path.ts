import {assertEquals} from 'https://deno.land/std@0.205.0/assert/mod.ts'
import {call_file_name} from 'lib'

Deno.test('call_file_name', () => {
  const file_name = call_file_name(import.meta)
  assertEquals(file_name, 'path.ts')
})
