import cc from 'classcat'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import styles from './switch.module.css'

type SwitchProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

const Switch = (props: SwitchProps) => {
  const { checked, onChange, disabled } = props

  const handleChange = (checked: boolean) => {
    if (!disabled && typeof onChange === 'function') {
      onChange(checked)
    }
  }

  return (
    <HeadlessSwitch
      checked={checked}
      onChange={handleChange}
      className={cc({
        [styles.switch]: true,
        [styles.enabled]: checked,
        [styles.disabled]: disabled,
      })}
    >
      <span aria-hidden="true" className={styles.switchKnob} />
    </HeadlessSwitch>
  )
}

export { Switch }
