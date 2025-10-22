// wwwroot/js/count.js
// Get Count tasks by status
function updateDashboard(tasks) {

    const statusCounts = {};
    tasks.forEach(task => {
        statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });

    const statusConfig = {
        "Done": {
            color: "bg-gradient-success",
            icon: "ni ni-check-bold",
            title: "Completed Tasks"
        },
        "In Progress": {
            color: "bg-gradient-warning",
            icon: "ni ni-user-run",
            title: "In Progress Tasks"
        },
        "To Do": {
            color: "bg-gradient-secondary",
            icon: "ni ni-bullet-list-67",
            title: "To Do Tasks"
        }
    };

    // Generate dashboard cards
    const dashboardHtml = Object.keys(statusCounts).map(status => {
        const count = statusCounts[status];
        const config = statusConfig[status] || {
            color: "bg-gradient-primary",
            icon: "ni ni-money-coins",
            title: `${status} Tasks`
        };

        return `
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">${config.title} Count</p>
                                <h5 class="font-weight-bolder">${count}</h5>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape ${config.color} shadow-primary text-center rounded-circle">
                                <i class="${config.icon} text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    // Update dashboard
    $('#dashboardCards').html(dashboardHtml);
}