# Release Readiness Dashboard
Dashboards for tracking [Release Statuses of Mozillian Awesomeness](https://release-dash.paas.allizom.org).<br>
Change logs, progress updates and latest developments on [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0ApNDjYXWm5JndDFwLWVlM1BPR3dBdjE1ZVdfWlBwR1E&usp=sharing)


## Deployment        
#### Database credentials
- Environment *development* stored in `/application/config/database.php`
- Environment *production* stored in `/application/config/production/database.php` 
    - Actual file is gitignored to protect your private credentials
    - Template is saved as `/application/config/production/database_template.php`
    - Use inline variables when deployed as Stackato application with a binded MySQL service

#### Instructions for deployment on Stackato
1. Clone the repository onto your local machine
2. Setup production database credentials as specified above
3. On `/stackato.yml`, modify the following:
    - Change the `name` for your copy of the dashboard
    - The rest of the configs have already been setup for you
3. `cd` into the root directory of the cloned repository using Terminal
4. Assuming that stackato is already installed, execute `$ stackato push`
5. The web application is now live on the internet
    - Application's database (MySQL service) is set up but still empty
    - Populate the database with data in `/assets/sql/dataset.sql` by:
        - Tunnel into the MySQL service via Stackato
        - **OR** Deploy phpMyAdmin for Stackato (recommended)
6. In future, update the code base by using Terminal:
    - `cd` into the dashboard's repository on your local machine
    - Run the command for `$ stackato update [dashboard's appname]`

#### Instructions for deploying phpMyAdmin on Stackato
1. Clone [this repository](https://github.com/Stackato-Apps/phpmyadmin) onto your local machine
2. Open `/stackato.yml` and modify the 
    - `name` Sub-domain where phpMyAdmin will be accessed
    - `services` Remove MySQL from being created (not needed)
    - `PMA_USERNAME` Login credentials for accessing phpMyAdmin
    - `PMA_PASSWORD` Login credentials for accessing phpMyAdmin
3. `cd` into the root directory of the cloned repository using Terminal
4. Assuming that stackato is already installed, execute `$ stackato push`
5. phpMyAdmin is now live on the internet.
    - However, it is still not binded to the application's database
    - To do this:
        - Identify the MySQL service that was created with the dashboard application
        - Run the command for `$ stackato bind-service <servicename> [phpMyAdmin's appname]`
        - Logging into phpMyAdmin should now display all the schema and data used by the dashboard

#### Instructions for deployment on other hosting services
- Standard Web Stack: Apache, MySQL, PHP 5.3 and above
- For deployment on local machine, try LAMP, [MAMP](http://www.mamp.info/en/downloads/) or [WAMP](http://www.wampserver.com/en/)


## URL Walkthrough
#### Landing page
- Accessed through "/" or "/overview" 
- Provides an overview of all active versions
- Executes from: `/application/controllers/overview.php/index`
- [More details...](http://blog.williecheong.com/running-with-the-train/)

#### Version page
- Accessed through "/for/[product]/[version]"
- Provides a detailed view of a specific version
- Executes from: `/application/controllers/watch.php/single`
- [More details about groups of queries...](http://blog.williecheong.com/groups-of-queries/)
- [More details about group rules...](http://blog.williecheong.com/release-readiness-dashboardrules-for-scoring/)

#### Administrator login page
- Accessed through "/admin"
- Allows a whitelisted user to sign in using Persona
- Executes from: `/application/controllers/admin.php/index`

#### Qb query builder page
- Accessed through "/admin/easy_qb"
- Translates Bugzilla URLs into Qb queries
- Executes from: `/application/controllers/admin.php/easy_qb`
- [More details...](http://blog.williecheong.com/release-readiness-dashboardqb-query-builder/)

#### User guide page
- Accessed through "/admin/help" or "/help"
- Read-able manual to help with getting started
- Executes from: `/application/controllers/admin.php/help`

#### Update components
- Accessed through "/admin/update_components"
- Grabs product components from Bugzilla and updates database
- Executes from: `/application/controllers/admin.php/update_components`

#### Update cycle
- Accessed through "/admin/update_cycle"
- Checks for new cycle and updates accordingly
- Automatically called when a current cycle is not found
- Executes from: `/application/controllers/admin.php/update_cycle`
- [More details...](http://blog.williecheong.com/running-with-the-train/)

## Testing
To be continued


## Troubleshoot
To be continued<br>
Reach out to [Willie Cheong](http://williecheong.com) for undocumented problems.


## References
- [CodeIgniter](http://ellislab.com/codeigniter): Server side PHP framework
- [CI Blades](https://github.com/laperla/codeigniter-Blade): Laravel style blade templating on CodeIgniter
- [CI RestServer](https://github.com/philsturgeon/codeigniter-restserver): Support for REST APIs on CodeIgniter
- [Qb](https://github.com/klahnakoski/qb): Qb queries on Bugzilla's ElasticSearch clusters
- [Persona](https://developer.mozilla.org/en-US/Persona): Email authentication service
- [D3-Rickshaw](http://code.shutterstock.com/rickshaw/): Javascript-based graphing tool
- [Twitter Bootstrap](http://getbootstrap.com/getting-started/): Beautiful user interfaces
- [Spectrum](http://bgrins.github.io/spectrum/): Beautiful colourpicker widget
- [Font Awesome](http://fontawesome.io/): Beautiful HTML icons
- [Gridster](http://gridster.net/): Beautiful grid boxes


## License
[Mozilla Public Liscense v2.0](LICENSE)
