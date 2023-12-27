export default function actionSuccess(actionName, additionalData = {}) {
    const data = {
        action: actionName,
        success: true,
        ...additionalData,
    };
    console.log(data);
    return data;
}
