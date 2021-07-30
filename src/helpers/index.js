import { NotificationProgrammatic as Notification } from 'buefy';

export const alertFailed = (message) => {
    Notification.open({
        duration: 5000,
        message,
        type: 'is-danger',
        position: 'is-bottom-right',
        hasIcon: false
    })
}