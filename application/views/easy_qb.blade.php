@layout('templates/layout')

@section('title')
    Release Readiness Dashboard :: Qb Builder
@endsection

@section('css')
    <link rel="stylesheet" href="/assets/css/easy_qb.css">
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-4 left-side">
                <div role="form">
                    {{-- The user input field for the Bugzilla URL to parse --}}
                    <div class="form-group">
                        <label for="bz-url">Bugzilla URL (Do not use named commands)</label>
                        <input type="text" class="form-control" id="bz-url" placeholder="Enter unshortened Bugzilla URL">
                    </div>
                    {{-- The user input fields for start and end dates of the output Qb --}}
                    <div class="form-group">
                        <label>Query Range (Leave blank for soft dates)</label>
                        <div class="row query-dates">
                            <div class="col-xs-6">
                                <input type="text" class="form-control datepicker" id="query-start" placeholder="Start Date">
                            </div>
                            <div class="col-xs-6">
                                <input type="text" class="form-control datepicker" id="query-end" placeholder="End Date">
                            </div>
                        </div>
                    </div>
                    {{-- The button for compiling the Qb query based on specified params --}}
                    <button type="button" class="btn btn-primary pull-right" id="query-compile">
                        <i class="fa fa-magic"></i> Qb query
                    </button>
                    {{-- The radio buttons for specifying whether Qb will pull from private or public cluster --}}
                    <div class="radio">
                        <label class="radio-inline">
                            <input type="radio" name="query-cluster" id="public_cluster" checked=""> Public Cluster
                        </label>
                    </div>
                    <div class="radio">
                        <label class="radio-inline">
                            <input type="radio" name="query-cluster" id="private_cluster"> Private Cluster
                        </label>
                    </div>
                    {{-- The button that links externally to github for references on soft tags --}}
                    <div class="well well-sm">
                        <a class="btn btn-xs btn-default" href="/help#groups_tags" target="_blank" style="width:100%;">
                            References for Soft Tags
                        </a>
                    </div>    
                </div>
            </div>
            <div class="col-md-8 right-side">
                <textarea class="form-control query-output" rows="25" placeholder="Output"></textarea>
            </div>
        </div>
    </div><!-- /container -->
@endsection

@section('javascript')
    <script src="/assets/js/common/qb_maker.js"></script>
    <script src="/assets/js/easy_qb/main.js"></script>
@endsection