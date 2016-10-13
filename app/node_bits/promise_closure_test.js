

task()


function task() {

    var task_var = 'hello world';

    var func_1 = get_func_1(task_var)
    var func_2 = get_func_2(task_var)

    func_1().then(func_2);

}

function get_func_1(task_var) {

    return function () {

        return new Promise(function (resolve, reject) {

            console.log("func_1")
            console.log("task_var: ",task_var)
            resolve()
        });

    }
}

function get_func_2(task_var) {

    return function () {

        return new Promise(function (resolve, reject) {

            console.log("func_2")
            console.log("task_var: ",task_var)
            resolve()
        });

    }
}