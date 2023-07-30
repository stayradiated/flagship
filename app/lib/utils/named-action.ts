/* Forked from https://github.com/sergiodxa/remix-utils */

import type { TypedResponse } from '@remix-run/node'

type ActionsRecord = Record<string, () => Promise<TypedResponse>>

type ResponsesRecord<Actions extends ActionsRecord> = {
  [Action in keyof Actions]: Actions[Action] extends () => Promise<
    TypedResponse<infer Result>
  >
    ? Result
    : never
}

type ResponsesUnion<Actions extends ActionsRecord> =
  ResponsesRecord<Actions>[keyof Actions]

/**
 * Runs an action based on the request's action name
 * @param request The request to parse for an action name
 * @param actions The map of actions to run
 * @returns The response from the action
 * @throws {ReferenceError} Action name not found
 * @throws {ReferenceError} Action "${name}" not found
 */
export async function namedAction<Actions extends ActionsRecord>(
  input: Request,
  actions: Actions,
): Promise<TypedResponse<ResponsesUnion<Actions>>> {
  const name = await getActionName(input)

  if (name && name in actions) {
    return actions[name]() as unknown as TypedResponse<ResponsesUnion<Actions>>
  }

  if (name === null && 'default' in actions) {
    return actions.default() as unknown as TypedResponse<
      ResponsesUnion<Actions>
    >
  }

  if (name === null) throw new ReferenceError('Action name not found')

  throw new ReferenceError(`Action "${name}" not found`)
}

async function getActionName(input: Request): Promise<string | null> {
  return findNameInURL(new URL(input.url).searchParams)
}

function findNameInURL(searchParameters: URLSearchParams) {
  return searchParameters.get('_action')
}
