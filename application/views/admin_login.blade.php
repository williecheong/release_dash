@layout('templates/layout')

@section('title')
    Release Readiness Dashboard :: User Manual
@endsection

@section('css')
@endsection

@section('content')
    <div class="container">
        <div class="row" style="margin:10%;">
            <div class="col-lg-12 text-center">
                <?php /* Nothing fancy. Just a big blue button for Persona login */ ?>
                <button class="btn btn-primary btn-lg" id="start-persona">
                    <i class="fa fa-users fa-lg"></i> Login with Persona
                </button>
            </div>
        </div>
    </div><!-- /container -->
@endsection

@section('javascript')
    <script src="/assets/js/admin/login.js"></script>
@endsection