<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Concerns\ApiResponse;
use App\Services\DashboardService;
use App\Services\PollReportService;
use App\Services\Reports\GrowthReportService;
use App\Services\Reports\IntegrityReportService;
use App\Services\Reports\ReportWindow;

class ReportController extends Controller
{
    use ApiResponse;
    /**
     * GET /api/reports/{poll} — per-poll report (admin only).
     */
    public function index(Request $request, \App\Models\Poll $poll)
    {
        return $this->success(PollReportService::generatePollReport($request, $poll));
    }

    /**
     * GET /api/reports/health — platform healthcheck report (admin only).
     */
    public function health(Request $request)
    {
        return $this->success(DashboardService::getPlatformHealth());
    }

    /**
     * GET /api/reports/growth — windowed Growth & Activation report (admin only).
     * Requires from/to; optional bucket (hour|day|week) and compare (bool).
     */
    public function growth(Request $request)
    {
        return $this->success(GrowthReportService::generate($this->window($request)));
    }

    /**
     * GET /api/reports/integrity — windowed Integrity & Abuse radar (admin only).
     * Requires from/to; optional bucket (hour|day|week) and compare (bool).
     */
    public function integrity(Request $request)
    {
        return $this->success(IntegrityReportService::generate($this->window($request)));
    }

    /**
     * Validate the shared dynamic-window params and build a ReportWindow.
     */
    private function window(Request $request): ReportWindow
    {
        $validated = $request->validate([
            'from' => ['required', 'date'],
            'to' => ['required', 'date', 'after_or_equal:from'],
            'bucket' => ['nullable', 'in:hour,day,week'],
            'compare' => ['nullable', 'boolean'],
        ]);

        return ReportWindow::make(
            $validated['from'],
            $validated['to'],
            $validated['bucket'] ?? null,
            $request->boolean('compare'),
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
