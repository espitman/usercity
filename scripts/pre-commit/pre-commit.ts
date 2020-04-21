import * as Git from 'simple-git/promise'
import { resolve as resolvePath } from 'path'
import { exec, ExecException } from 'child_process'

const workingDir = resolvePath(__dirname, '..', '..')
const git = Git(workingDir)
const tslintDir = resolvePath(
  `${workingDir}`,
  'node_modules',
  'tslint',
  'bin',
  'tslint'
)
const execPromise = cmd =>
  new Promise((resolve, reject) => {
    exec(cmd, (err: ExecException, stdOut: string, stdErr: string) => {
      if (err) {
        return reject(new Error(`${stdOut} ${stdErr}`))
      }
      return resolve(stdOut)
    })
  })

async function lint(files: string[]) {
  try {
    if (files.length) {
      await execPromise(
        `pretty-quick --staged && ${tslintDir} --fix -c tslint.json ${files.join(
          ' '
        )}`
      )
    }
  } catch (e) {
    console.log(e.message) // tslint:disable-line
    process.exit(1)
  }
}

async function main() {
  try {
    const { staged } = await git.status()
    const stagedFiles = staged
      .filter(fileName => /\.ts$/.test(fileName))
      .map(fileName => `${workingDir}/${fileName}`)

    // await execPromise(`yarn test:badges`)
    await lint(stagedFiles)
    await git.add(stagedFiles)
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e.message)
    process.exit(1)
  }
}

main()
