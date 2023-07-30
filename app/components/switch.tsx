import cc from 'classcat'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import styles from './switch.module.css'

type SwitchProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const Switch = (props: SwitchProps) => {
  const { checked, onChange } = props

  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      className={cc({ [styles.switch]: true, [styles.enabled]: checked })}
    >
      <span aria-hidden="true" className={styles.switchKnob} />
    </HeadlessSwitch>
  )
}

export { Switch }
