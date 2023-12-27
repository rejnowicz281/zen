export default function actionError(actionName, additionalData = {}) {
    const data = {
        action: actionName,
        success: false,
        ...additionalData,
    };
    console.error(data);
    return data;
}
