<?php

namespace JavisERP\System;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use JavisERP\System\User;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Doctrine\DBAL\Connection;

class UserProvider implements UserProviderInterface
{
    private $conn;

    public function __construct(Connection $conn)
    {
        $this->conn = $conn;
    }

    public function loadUserByUsername($username)
    {
        $stmt = $this->conn->executeQuery('SELECT * FROM employee WHERE username = ? AND deleted_at IS NULL', array(strtolower($username)));

        if (!$user = $stmt->fetch()) {
        	throw new UsernameNotFoundException(sprintf('Username "%s" does not exist.', $username));
        }
        if ($user['disabled'] == 1){
        	throw new UsernameNotFoundException(sprintf('User login disabled for "%s"', $username));
        }
		
		$roles = $this->conn->fetchAll('SELECT
        	permission_role.*
        FROM
        	(permission_role,
        	employee_role)
        WHERE
        	employee_role.role_id = permission_role.id AND
        	permission_role.deleted_at IS NULL AND
        	employee_role.employee_id = ?
        ORDER BY
        	permission_role.title', array($user['id']));
        	
        $sth = $this->conn->executeQuery('SELECT 
        	permission_resource.resourceid
        FROM
        	(permission_resource,
        	permission_role_resource AS prr,
        	employee_role)
        	LEFT JOIN permission_resource AS parent ON parent.id = permission_resource.parent_id
        WHERE
        	permission_resource.id = prr.resource_id AND
        	employee_role.role_id = prr.role_id AND
        	employee_role.employee_id = ? AND
        	permission_resource.deleted_at IS NULL', array($user['id']));
        $resources = array();
        while ($r = $sth->fetch()){
        	$resources[] = $r['resourceid'];
        }
        return new User($user['id'],$user['username'], $user['password'], $user['newpassword'], $user['email'], $user['manager_user_id'],$user['first_name'],$user['last_name'], $resources, true, true, true, true);
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    public function supportsClass($class)
    {
        return $class === 'JavisERP\System\User';
    }
}